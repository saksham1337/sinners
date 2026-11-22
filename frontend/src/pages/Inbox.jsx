import { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Show, UserButton, useAuth } from "@clerk/react";
import { Loader2, ChevronDown, Mail } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UsersPanel } from "./UsersPanel";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TYPE = { partner: "Partner enquiry", rate_card: "Rate card request" };
const fmt = (iso) => new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

const Row = ({ e, onToggle, busy }) => {
  const [open, setOpen] = useState(false);
  const Item = ({ k, v }) => <div><dt className="text-xs text-[#8A8F98]">{k}</dt><dd className="mt-1 text-sm text-[#111418] break-words">{v || "-"}</dd></div>;
  return (
    <li className="border-b border-border bg-white" data-testid={`enquiry-row-${e.id}`}>
      <div className="flex flex-wrap items-center gap-4 px-5 py-4">
        <button onClick={() => setOpen(!open)} className="flex-1 min-w-[220px] flex items-center gap-3 text-left" data-testid={`enquiry-expand-${e.id}`}>
          <ChevronDown size={16} className={`text-[#8A8F98] transition-transform ${open ? "rotate-180" : ""}`} />
          <div>
            <p className="text-sm font-semibold text-[#111418]">{e.agency} <span className="font-normal text-[#575B62]">/ {e.name}</span></p>
            <p className="text-xs text-[#8A8F98] mt-0.5">{fmt(e.created_at)} · {e.country}</p>
          </div>
        </button>
        <Badge variant="outline" className="font-num text-[0.65rem]">{TYPE[e.form_type]}</Badge>
        {e.nda && <Badge className="bg-[#0F172A] text-[0.65rem]">NDA requested</Badge>}
        <Badge variant={e.status === "handled" ? "secondary" : "default"} className={e.status === "new" ? "bg-[#0D5940]" : ""} data-testid={`enquiry-status-${e.id}`}>
          {e.status === "new" ? "New" : "Handled"}
        </Badge>
        <button disabled={busy} onClick={() => onToggle(e)} data-testid={`enquiry-toggle-${e.id}`}
          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-[#111418] hover:border-[#111418] transition-colors disabled:opacity-50">
          {e.status === "new" ? "Mark as handled" : "Mark as new"}
        </button>
      </div>
      {open && (
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 pb-6 pl-12" data-testid={`enquiry-details-${e.id}`}>
          <Item k="Email" v={<a href={`mailto:${e.email}`} className="link-underline">{e.email}</a>} />
          <Item k="Website" v={e.website} />
          <Item k="Monthly volume" v={e.volume} />
          <Item k="Email notification" v={e.email_status} />
          <div className="sm:col-span-2"><Item k="Services" v={e.services.join(", ")} /></div>
          {e.form_type === "partner" && <div className="sm:col-span-2"><Item k="Engagement models" v={e.models.join(", ")} /></div>}
          {e.message && <div className="sm:col-span-2 lg:col-span-4"><Item k="Message" v={<span className="whitespace-pre-wrap">{e.message}</span>} /></div>}
        </dl>
      )}
    </li>
  );
};

const InboxBody = () => {
  const { getToken } = useAuth();
  const [me, setMe] = useState(null);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState("enquiries");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const auth = useCallback(async () => ({ headers: { Authorization: `Bearer ${await getToken()}` } }), [getToken]);

  useEffect(() => {
    (async () => {
      try { setMe((await axios.get(`${API}/me`, await auth())).data); }
      catch { setMe({ role: "error" }); }
    })();
  }, [auth]);

  const load = useCallback(async () => {
    setLoading(true);
    const params = {};
    if (type !== "all") params.form_type = type;
    if (status !== "all") params.status = status;
    try { setItems((await axios.get(`${API}/enquiries`, { ...(await auth()), params })).data); }
    catch { toast.error("Could not load enquiries."); }
    setLoading(false);
  }, [type, status, auth]);

  useEffect(() => { if (me?.role === "admin") load(); }, [me, load]);

  const toggle = async (e) => {
    setBusyId(e.id);
    try {
      const next = e.status === "new" ? "handled" : "new";
      const { data } = await axios.patch(`${API}/enquiries/${e.id}`, { status: next }, await auth());
      setItems((xs) => (status !== "all" && data.status !== status ? xs.filter((x) => x.id !== e.id) : xs.map((x) => (x.id === e.id ? data : x))));
      toast.success(next === "handled" ? "Marked as handled." : "Marked as new.");
    } catch { toast.error("Could not update the enquiry."); }
    setBusyId(null);
  };

  if (!me) return <div className="p-16 flex justify-center"><Loader2 className="animate-spin text-[#8A8F98]" /></div>;
  if (me.role !== "admin") {
    return (
      <div className="container-x py-24 max-w-xl" data-testid="inbox-no-access">
        <h1 className="text-3xl font-semibold text-[#111418]">No access to the inbox</h1>
        <p className="mt-4 text-[#575B62]">This area is for the Sinnovation team. If you should have access, ask an admin to grant it.</p>
        <Link to="/" className="mt-8 inline-block text-sm font-medium link-underline">Back to the website</Link>
      </div>
    );
  }

  const open = items.filter((x) => x.status === "new").length;
  return (
    <div className="container-x py-12" data-testid="inbox-page">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Private</p>
          <h1 className="mt-3 text-3xl lg:text-4xl font-semibold text-[#111418]">Enquiries</h1>
          <p className="mt-2 text-sm text-[#575B62]" data-testid="inbox-count">{items.length} shown · {open} new</p>
        </div>
        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="enquiries" data-testid="inbox-view-enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="team" data-testid="inbox-view-team">Team access</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {view === "team" ? <UsersPanel auth={auth} /> : (
        <>
          <div className="mt-8 flex flex-wrap gap-3">
            <Tabs value={type} onValueChange={setType}>
              <TabsList>
                <TabsTrigger value="all" data-testid="filter-type-all">All forms</TabsTrigger>
                <TabsTrigger value="partner" data-testid="filter-type-partner">Partner</TabsTrigger>
                <TabsTrigger value="rate_card" data-testid="filter-type-rate-card">Rate card</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs value={status} onValueChange={setStatus}>
              <TabsList>
                <TabsTrigger value="all" data-testid="filter-status-all">Any status</TabsTrigger>
                <TabsTrigger value="new" data-testid="filter-status-new">New</TabsTrigger>
                <TabsTrigger value="handled" data-testid="filter-status-handled">Handled</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="mt-6 border-t border-x border-border">
            {loading ? <div className="p-12 flex justify-center border-b border-border"><Loader2 className="animate-spin text-[#8A8F98]" /></div>
              : items.length === 0 ? (
                <div className="p-12 text-center border-b border-border bg-white" data-testid="inbox-empty">
                  <Mail className="mx-auto text-[#8A8F98]" />
                  <p className="mt-3 text-sm text-[#575B62]">No enquiries match these filters yet.</p>
                </div>
              ) : <ul data-testid="enquiry-list">{items.map((e) => <Row key={e.id} e={e} onToggle={toggle} busy={busyId === e.id} />)}</ul>}
          </div>
        </>
      )}
    </div>
  );
};

export default function Inbox() {
  return (
    <div className="min-h-screen bg-[#F4F4F2]">
      <title>Enquiries | Sinnovation</title>
      <meta name="robots" content="noindex" />
      <header className="border-b border-border bg-white">
        <div className="container-x h-16 flex items-center justify-between">
          <Link to="/" data-testid="inbox-home-link"><Logo /></Link>
          <Show when="signed-in"><UserButton /></Show>
        </div>
      </header>
      <Show when="signed-in"><InboxBody /></Show>
      <Show when="signed-out"><Navigate to="/sign-in" replace /></Show>
    </div>
  );
}
