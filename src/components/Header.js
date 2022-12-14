import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const navigate = useNavigate();
  // console.log(result);

  // this checks if user is already loggedin or not
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  // we are using googleauth as provider which we are passing in signInwithPopup
  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      navigate("/");
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      navigate("/login");
    });
  };

  return (
    //
    <Nav>
      <Logo src="/images/logo.svg" />

      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <Link to="/">
              <img src="/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </Link>
            <a>
              <img src="/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg src={userPhoto} onClick={signOut} />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.div`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100px;
    padding: 5px 0px;
  }
`;

const Logo = styled.img`
  width: 80px;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    row-gap: 10px;
  }

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;

    @media (max-width: 768px) {
      padding: 0 6px;
    }

    img {
      height: 20px;

      @media (max-width: 768px) {
        height: 10px;
      }
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      color: white;

      @media (max-width: 768px) {
        font-size: 8px;
      }

      &::after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform: scaleX(0);
        transform: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }

    &:hover {
      span::after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    margin
    margin-top: 10px;
  }
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  color: #fff;
  text-decoration: none;

  @media (max-width: 768px) {
    padding: 2px 8px;
    margin-top: 20px;
  }

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    text-decoration: none;
  }
`;

const LoginContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;

  a {
    text-decoration: none;
  }
`;
