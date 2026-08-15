export const AppHeader = () => {
  return (
    <div className="w-full bg-yellow-200 h-20 flex justify-between items-center px-8">
      <div className="right-section">
        <input type="search" placeholder="Search knowledge base" />
      </div>
      <div className="flex gap-4">
        <div className="notification">Bell Icon</div>
        <div className="help">Help icon</div>
        <div className="quick-action">Quick action icon</div>
        <div className="profile">Profile icon</div>
      </div>
    </div>
  );
};
