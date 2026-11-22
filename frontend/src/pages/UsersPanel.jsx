import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const UsersPanel = ({ auth }) => {
  const [data, setData] = useState({ roles: [], users: [] });

  const load = useCallback(async () => {
    try { setData((await axios.get(`${API}/users`, await auth())).data); }
    catch { toast.error("Could not load team members."); }
  }, [auth]);
  useEffect(() => { load(); }, [load]);

  const change = async (userId, role) => {
    try {
      await axios.patch(`${API}/users/${userId}/role`, { role }, await auth());
      toast.success("Access updated.");
      load();
    } catch (e) {
      toast.error(e.response?.status === 409 ? "Keep at least one admin." : "Could not update access.");
    }
  };

  return (
    <div className="mt-8 border border-border bg-white" data-testid="users-panel">
      <p className="px-5 py-4 text-sm text-[#575B62] border-b border-border">People who have signed in. Admins can see the enquiries inbox; members cannot.</p>
      <ul>
        {data.users.map((u) => (
          <li key={u.user_id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0" data-testid={`user-row-${u.user_id}`}>
            <span className="text-sm text-[#111418]">{u.email || u.user_id}</span>
            <Select value={u.role} onValueChange={(r) => change(u.user_id, r)}>
              <SelectTrigger className="w-36" data-testid={`user-role-select-${u.user_id}`}><SelectValue /></SelectTrigger>
              <SelectContent>{data.roles.map((r) => <SelectItem key={r} value={r}>{r === "admin" ? "Admin" : "Member"}</SelectItem>)}</SelectContent>
            </Select>
          </li>
        ))}
      </ul>
    </div>
  );
};
