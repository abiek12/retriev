export const AppHeader = () => {
  return (
    <div className="w-full bg-yellow-200 h-20 flex justify-between items-center">
      <div className="right-section">
        <input type="search" placeholder="Search knowledge base" />
      </div>
      <div className="left-section">
        <div className="notification">Bell Icon</div>
        <div className="help">Help icon</div>
        <div className="quick-action">Quick action icon</div>
        <div className="profile">Profile icon</div>
      </div>
    </div>
  );
};
