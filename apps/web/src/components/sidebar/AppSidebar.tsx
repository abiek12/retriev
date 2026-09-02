export const AppSidebar = () => {
  return (
    <div className="w-xs h-full flex flex-col bg-sidebar p-6">
      <div className="header flex items-center justify-start gap-3 w-full py-3">
        <div className="logo">R</div>
        <h1>Retriev</h1>
      </div>
      <nav className="flex flex-col gap-1 my-6">
        <div className="flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm hover:bg-sidebar-accent">
          <div className="icon">D</div>
          <div className="text">Dashboard</div>
        </div>
        <div className="flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm hover:bg-sidebar-accent">
          <div className="icon">A</div>
          <div className="text">Agents</div>
        </div>
        <div className="flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm hover:bg-sidebar-accent">
          <div className="icon">K</div>
          <div className="text">Knowledge Base</div>
        </div>
        <div className="flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm hover:bg-sidebar-accent">
          <div className="icon">C</div>
          <div className="text">Conversations</div>
        </div>
        <div className="flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm hover:bg-sidebar-accent">
          <div className="icon">U</div>
          <div className="text">Usage</div>
        </div>
        <div className="flex gap-3 items-center justify-start p-3 cursor-pointer rounded-sm hover:bg-sidebar-accent">
          <div className="icon">I</div>
          <div className="text">Integrations</div>
        </div>
      </nav>
    </div>
  );
};
