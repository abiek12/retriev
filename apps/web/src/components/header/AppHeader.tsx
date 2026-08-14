export const AppHeader = () => {
  return (
    <div>
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
