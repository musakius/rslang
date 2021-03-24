import Style from 'styled-components';

export default Style.div`
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .pop-up {
    z-index: 50;
    width: 80%;
    max-width: 745px;
    height: 485px;
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-left: 50px;
    font-family: 'Exo', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 40px;
    box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    width: 80%;
    min-width: 300px;
    margin-left: 0;
    margin-top: 20px;
   }
  }

  .top {
    width: 100%;
    height: 350px;
    color: #000;
    border-radius: 12px 12px 0 0;
    text-align: center;
  }

  .content {
    min-height: 300px;
    font-family: 'Exo',sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    width: 50%;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      width: 90%;
      margin: 0 auto;
    }
  }

  img {
    width: 70px;
    margin: 30px;
  }
  
  .bottom {
    width: 100%;
    height: 125px;
    background-color: #fff;
    color: #6979F8;
    text-align: center;
    margin: auto;
    border-radius: 0 0 12px 12px;
    font-size: 24px;
    display: flex;
    
    @media (max-width: 520px) {
      height: 100px;
    }
  }
  
  .btn-wrapper {
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  
  .exit-bg {
    background: #FDAFBB;
  }
  
  .cancel, .exit {
    font-family: 'Exo', sans-serif;
    width: 175px;
    height: 48px;
    border-radius: 6px;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 22px;
    box-sizing: border-box;
    margin: 10px;
    text-align: center;
    outline: none;
        
    @media (max-width: 520px) {
      width: 100px;
    }
  }
  .cancel {
    background-color: #fff;
    border: 1px solid #6979F8;
    color: #6979F8;
    
    &:hover,
    &:focus,
    &:active{
      border: 1px solid #5865CE;
      background-color: #fff;
      color: #5865CE;
      cursor: pointer;
      outline: none;
    }
  }
  
  .exit {
    border: 1px solid #6979F8;
    background-color: #6979F8;
    color: #fff;
    
    &:hover,
    &:focus,
    &:active {
      border: 1px solid #5865CE;
      background-color: #5865CE;
      color: #fff;
      cursor: pointer;
      outline: none;
    }
  }
`;
