import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import { authenticate } from "./store/session";
import { allListings } from "./store/listings";
import Cart from "./components/Cart";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const [cart, setCart] = useState(false);
  const [posted, setPosted] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(allListings());
      await setLoaded(true);
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={loaded ? "unloaded loaded" : "unloaded"}>
        <div>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 105 26"
            fill="none"
            className="svgLogo"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="left-to-right">
                <stop offset="0" stop-color="#8a2be2">
                  <animate
                    dur="1.5s"
                    attributeName="offset"
                    fill="freeze"
                    from="0"
                    to="1"
                  />
                </stop>
                <stop offset="0" stop-color="#31bacd">
                  <animate
                    dur="1.5s"
                    attributeName="offset"
                    fill="freeze"
                    from="0"
                    to="1"
                  />
                </stop>
              </linearGradient>
            </defs>
            <path
              d="M27.3699 0C25.8348 2.50767 23.2306 3.66909 20.3867 4.03853C19.3425 4.17414 18.283 4.07209 17.2329 4.24825C14.9811 4.62602 12.8458 5.54399 10.9818 6.85493C9.32667 8.01888 7.89374 9.57305 6.87131 11.3197C6.50053 11.953 6.16662 12.6102 5.89095 13.2907C5.78485 13.5527 5.70838 14.0349 5.45005 14.1902C5.20378 14.3384 4.72751 14.2481 4.44902 14.2481H1.91477V23.5967H6.64537V18.3593C6.64537 17.5245 6.52908 16.5925 6.66368 15.7687C6.84085 14.6843 7.38391 13.5723 7.90174 12.6149C11.6354 5.71209 20.7207 3.49766 27.201 7.86576C28.4086 8.6797 29.5083 9.70348 30.3843 10.8691C31.4401 12.2742 32.4345 14.0143 32.7501 15.7687C32.9007 16.6054 32.7763 17.5657 32.7763 18.4156V23.5967H37.4506V14.2481H33.8464C33.6593 12.9813 32.7882 11.6265 32.0812 10.5875C31.7927 10.1636 31.4969 9.66237 31.0868 9.34858V9.29226C33.5693 7.87781 33.3369 4.16248 32.796 1.80214C32.669 1.24815 32.4534 0.720556 32.3258 0.16895H32.2695C31.6924 2.18745 30.0647 3.29751 28.3273 4.22375C28.3273 2.69188 28.1902 1.38331 27.4826 0H27.3699V0ZM14.8113 11.4007C13.6577 11.5809 12.6843 12.3033 11.8265 13.0496C9.48098 15.0903 8.03493 18.4601 7.99675 21.5693C7.9806 22.8865 7.82797 24.9042 9.12331 25.7385C10.1728 26.4143 11.8026 25.4001 12.7276 24.8841C15.1924 23.5091 17.429 21.3998 20.443 21.6915C22.7598 21.9157 24.7984 23.8131 26.7504 24.9159C27.5757 25.3821 28.8548 26.1482 29.8479 25.9328C31.1633 25.6475 31.3311 23.9443 31.4343 22.8646C31.7246 19.8266 30.5424 16.2533 28.5365 13.9665C27.3111 12.5697 25.14 10.7409 23.1462 11.5941C21.864 12.1427 21.0954 13.5066 19.5419 13.3983C17.6958 13.2697 16.7867 11.0922 14.8113 11.4007ZM14.1918 13.9827C17.9556 13.5205 19.6741 18.7907 16.5008 20.7461C16.0543 21.0212 15.5579 21.2037 15.0366 21.2714C11.2709 21.7608 9.29029 16.595 12.5586 14.5426C13.0573 14.2295 13.6088 14.0543 14.1918 13.9827V13.9827ZM24.8357 13.9827C28.6069 13.5195 30.3524 18.8009 27.1447 20.7547C26.7012 21.0249 26.1958 21.2044 25.6804 21.2714C21.8749 21.766 19.974 16.5444 23.2588 14.5193C23.7376 14.2241 24.2786 14.0511 24.8357 13.9827V13.9827ZM13.9102 17.0076C13.4427 17.0076 12.7652 16.8847 12.3336 17.0884C11.8743 17.3052 11.8401 17.9254 12.2781 18.1852C12.7044 18.4381 13.4315 18.3029 13.9102 18.3029C13.9102 18.7567 13.7769 19.4658 13.9845 19.879C14.2017 20.3114 14.8348 20.3651 15.085 19.9336C15.3358 19.5012 15.2055 18.7847 15.2055 18.3029C15.6822 18.3029 16.4079 18.436 16.8334 18.1824C17.2494 17.9346 17.1923 17.3148 16.7815 17.1027C16.3555 16.8829 15.6735 17.0076 15.2055 17.0076C15.2055 16.5275 15.3322 15.8126 15.0836 15.3798C14.8383 14.9526 14.1978 15.007 13.9845 15.4316C13.7769 15.8447 13.9102 16.5539 13.9102 17.0076V17.0076ZM25.0046 15.0734C24.1255 15.3449 24.5165 16.7365 25.3988 16.464C26.278 16.1925 25.887 14.8009 25.0046 15.0734V15.0734ZM0 15.5434V22.3014H1.52055V15.5434H0V15.5434ZM37.9012 15.5434V22.3014H39.4217V15.5434H37.9012ZM23.2025 16.9259C22.2693 17.1283 22.5637 18.5361 23.4841 18.3368C24.3689 18.1452 24.0977 16.7316 23.2025 16.9259ZM26.9194 16.9252C25.9987 17.1369 26.3432 18.564 27.2572 18.3277C28.1321 18.1016 27.7954 16.7238 26.9194 16.9252ZM25.1736 18.7882C24.2142 18.8433 24.3252 20.2945 25.2862 20.2115C26.1775 20.1346 26.067 18.7369 25.1736 18.7882Z M44.8506 19.5819H43.2472V7.42257H44.8506V19.5819ZM49.0095 10.5459L49.0596 11.6817C49.7499 10.8132 50.6519 10.3789 51.7654 10.3789C53.675 10.3789 54.6382 11.4562 54.6549 13.6108V19.5819H53.1099V13.6024C53.1043 12.9511 52.954 12.4695 52.6589 12.1577C52.3694 11.8459 51.9157 11.69 51.2977 11.69C50.7966 11.69 50.3568 11.8236 49.9782 12.0909C49.5996 12.3581 49.3045 12.7089 49.093 13.1431V19.5819H47.548V10.5459H49.0095ZM56.609 14.9887C56.609 13.6024 56.9375 12.489 57.5945 11.6483C58.2514 10.802 59.1116 10.3789 60.175 10.3789C61.2328 10.3789 62.0707 10.7408 62.6887 11.4645V6.75448H64.2337V19.5819H62.814L62.7388 18.6132C62.1208 19.3703 61.2607 19.7489 60.1583 19.7489C59.1116 19.7489 58.257 19.3202 57.5945 18.4628C56.9375 17.6054 56.609 16.4864 56.609 15.1057V14.9887ZM58.154 15.1641C58.154 16.1885 58.3656 16.9902 58.7887 17.5693C59.2118 18.1483 59.7964 18.4378 60.5425 18.4378C61.5223 18.4378 62.2377 17.998 62.6887 17.1183V12.9678C62.2266 12.1159 61.5168 11.69 60.5592 11.69C59.802 11.69 59.2118 11.9823 58.7887 12.5669C58.3656 13.1515 58.154 14.0172 58.154 15.1641ZM68.3174 19.5819H66.7724V10.5459H68.3174V19.5819ZM66.6472 8.14913C66.6472 7.89859 66.7223 7.68703 66.8726 7.51444C67.0285 7.34185 67.2568 7.25555 67.5574 7.25555C67.8581 7.25555 68.0864 7.34185 68.2422 7.51444C68.3981 7.68703 68.4761 7.89859 68.4761 8.14913C68.4761 8.39966 68.3981 8.60844 68.2422 8.77546C68.0864 8.94249 67.8581 9.026 67.5574 9.026C67.2568 9.026 67.0285 8.94249 66.8726 8.77546C66.7223 8.60844 66.6472 8.39966 66.6472 8.14913ZM74.5474 19.7489C73.3225 19.7489 72.326 19.3481 71.5577 18.5463C70.7894 17.7391 70.4052 16.6618 70.4052 15.3144V15.0305C70.4052 14.1341 70.575 13.3352 70.9146 12.6337C71.2598 11.9266 71.7386 11.3755 72.351 10.9802C72.969 10.5793 73.6371 10.3789 74.3553 10.3789C75.53 10.3789 76.4431 10.7658 77.0945 11.5397C77.7459 12.3136 78.0716 13.4215 78.0716 14.8635V15.5065H71.9502C71.9724 16.3973 72.2313 17.1183 72.7268 17.6695C73.2279 18.2151 73.8626 18.4879 74.6309 18.4879C75.1765 18.4879 75.6386 18.3765 76.0172 18.1538C76.3958 17.9311 76.727 17.6361 77.011 17.2686L77.9547 18.0035C77.1975 19.1671 76.0617 19.7489 74.5474 19.7489ZM74.3553 11.6483C73.7318 11.6483 73.2084 11.8765 72.7853 12.3331C72.3622 12.784 72.1005 13.4187 72.0003 14.2371H76.5266V14.1202C76.4821 13.3352 76.2705 12.7284 75.8919 12.2997C75.5133 11.8654 75.0011 11.6483 74.3553 11.6483ZM83.0823 15.0472H79.0069V13.7862H83.0823V15.0472ZM93.8136 17.9868C93.4016 18.577 92.8253 19.0196 92.0849 19.3147C91.35 19.6042 90.4926 19.7489 89.5127 19.7489C88.5217 19.7489 87.642 19.5179 86.8737 19.0558C86.1054 18.5881 85.5097 17.9256 85.0866 17.0682C84.669 16.2108 84.4547 15.217 84.4435 14.0868V13.0262C84.4435 11.1945 84.8694 9.77482 85.7213 8.76711C86.5787 7.7594 87.7812 7.25555 89.329 7.25555C90.5984 7.25555 91.62 7.58125 92.3939 8.23264C93.1677 8.87846 93.641 9.79709 93.8136 10.9885H92.2101C91.9095 9.37953 90.9519 8.57504 89.3373 8.57504C88.2628 8.57504 87.4472 8.95362 86.8904 9.7108C86.3393 10.4624 86.0609 11.5536 86.0553 12.9845V13.9783C86.0553 15.3423 86.3671 16.4279 86.9906 17.2352C87.6142 18.0369 88.4577 18.4378 89.5211 18.4378C90.1223 18.4378 90.6485 18.371 91.0994 18.2374C91.5504 18.1037 91.9234 17.8783 92.2185 17.5609V14.8301H89.4041V13.5273H93.8136V17.9868ZM95.8429 14.9804C95.8429 14.0952 96.0155 13.299 96.3607 12.592C96.7114 11.8849 97.1958 11.3393 97.8138 10.9551C98.4373 10.571 99.1472 10.3789 99.9433 10.3789C101.174 10.3789 102.168 10.8048 102.925 11.6566C103.687 12.5084 104.069 13.6414 104.069 15.0556V15.1641C104.069 16.0438 103.899 16.8344 103.559 17.5359C103.225 18.2318 102.744 18.7746 102.115 19.1643C101.491 19.5541 100.773 19.7489 99.96 19.7489C98.7352 19.7489 97.7414 19.323 96.9787 18.4712C96.2215 17.6194 95.8429 16.492 95.8429 15.089V14.9804ZM97.3962 15.1641C97.3962 16.1663 97.6273 16.9708 98.0894 17.5776C98.557 18.1845 99.1806 18.4879 99.96 18.4879C100.745 18.4879 101.369 18.1817 101.831 17.5693C102.293 16.9513 102.524 16.0883 102.524 14.9804C102.524 13.9894 102.287 13.1877 101.814 12.5753C101.346 11.9573 100.723 11.6483 99.9433 11.6483C99.1806 11.6483 98.5654 11.9517 98.0977 12.5586C97.63 13.1654 97.3962 14.0339 97.3962 15.1641Z"
              fill="url(#left-to-right)"
            />
          </svg>
        </div>
      </div>
      {loaded && (
        <>
          <NavBar
            setCart={setCart}
            cart={cart}
            posted={posted}
            setPosted={setPosted}
          />
          <Cart
            cart={cart}
            setCart={setCart}
            posted={posted}
            setPosted={setPosted}
          ></Cart>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;