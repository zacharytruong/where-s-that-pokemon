import { Link } from 'react-router-dom';

function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#000000',
        minHeight: '10rem'
      }}
    >
      <Link
        to="/leaderboard"
        style={{ color: '#FFFFFF', fontSize: '2.5rem', padding: '0 2rem' }}
      >
        Leaderboard
      </Link>
      <Link to="/" style={{ fontSize: '2.5rem' }}>
        Where's that pokemon
      </Link>
      <Link
        to="/info"
        style={{ color: '#FFFFFF', fontSize: '2.5rem', padding: '0 2rem' }}
      >
        Info
      </Link>
    </div>
  );
}

export default Header;
