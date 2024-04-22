const Burger = () => {
  return (
    <div>
      <span onClick={openNav}>&#9776</span>

      <nav id="sidebar">
        <Sidebar />
      </nav>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      <div>
        <span onClick={closeNav}>&#10005;</span>
      </div>
      <li>Home</li>
      <li>Search</li>
      <li>Chat</li>
    </>
  );
};

const openNav = () => {
  document.getElementById("sidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("sidenav").style.width = "0";
};

export default Burger;
