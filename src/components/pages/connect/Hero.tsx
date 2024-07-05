import React from "react";

interface HeroComponentProps {
  className?: string;
  name?: string;
  bio?: string;
  infos?: Info[];
}

interface Info {
  header: string;
  info: string[];
}

function Hero({ className, name, bio, infos }: HeroComponentProps) {
  return (
    <div
      id="connect-hero"
      className={`${className} transform-gpu h-[100dvh] w-full hero`}
    >
      <div className="container">
        <div className="w-full h-full  flex flex-row">
          <div className="h-full max-w-[40ch] gap-y-[0.75rem] text-left flex-col justify-between items-start mr-[4vw] pt-[9rem] pb-[2rem] flex items-start justify-start">
            <div>
              <span className="pr-[2px] font-benzin">{name}</span> {bio}
            </div>
            <div className="gap-x-[7vw] gap-y-[1rem] grid">
              {infos?.map((info, index) => (
                <div
                  id="w-node-c86f5a80-1d16-8548-99b5-2202ab20bafd-57647ad5"
                  className="gap-y-[8px] text-left flex-col items-start text-[1rem] font-[500] flex"
                >
                  <h2 className="uppercase font-benzin text-[0.85rem] leading-[1.1]">
                    {info.header}
                  </h2>
                  <div className="w-full h-[1px] bg-[#d8c8af] opacity-[0.7]"></div>
                  {info.info?.map((email, index) => (
                    <div
                      key={index}
                      className="connect-info-text"
                      role="link"
                      aria-label={email}
                    >
                      <a href={`mailto:${email}`} className="connect-info-link">
                        {email}
                      </a>
                      <div className="copy-wrapper">
                        <div className="copy-tag"></div>
                        <div className="copy-tag is-2"></div>
                        <div className="copy-message">
                          <div
                            id="w-node-eb60eac7-6e49-17ac-4c5a-59b52c3f97cb-57647ad5"
                            className="copy-text"
                          >
                            COPY EMAIL
                          </div>
                          <div
                            id="w-node-eb60eac7-6e49-17ac-4c5a-59b52c3f97cd-57647ad5"
                            className="copied-text"
                          >
                            COPied EMAIL
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[max-content_auto] [grid-area:span_1_/_span_1_/_span_1_/_span_1]">
            <div className="w-[37vw] h-[100vh] [grid-area:span_1_/_span_1_/_span_1_/_span_1]">
              <canvas
                width="1018"
                height="1876"
                // style="width: 509px; height: 938px;"
              ></canvas>
            </div>
            <div
              id="w-node-de5df3b0-c102-1c75-4b3c-b5a897e8b532-57647ad5"
              className="pb-[2rem] [grid-area:span_1_/_span_1_/_span_1_/_span_1] self-end justify-self-end"
            >
              <div className="relative bottom-[3%] z-[5] w-[8.5rem]">
                <div className="text-right uppercase pb-[7px] pr-[8px] text-[1.275rem]">
                  connect <span className="[text-transform:none]">with</span>
                </div>
                <div className="w-embed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 256 151"
                  >
                    <path
                      fill="currentColor"
                      d="M243.212 111.274c-.096-.455-.183-.918-.279-1.372-2.316-11.404-4.597-22.772-6.799-32.839-1.844-8.432-3.687-16.245-5.566-23.279-2.455-8.974-3.688-14.855-10.303-16-6.606-.882-14.313 3.828-22.3 13.85-2.831 3.54-5.592 7.42-8.266 11.238-1.87 2.665-3.801 5.462-5.724 8.162l-.314.445c-2.019 2.823-4.099 5.733-6.239 7.97-1.486 1.555-2.779 2.28-3.478 1.975-.656-.289-.708-1.451-.14-3.199 1.389-4.343 3.119-8.056 4.867-10.407.682-.909 1.363-1.844 2.054-2.788 4.876-6.658 9.918-13.518 14.977-17.616 6.746-5.497 13.737-9.656 20.509-11.78 3.906-1.231 7.934-1.87 12.015-1.642 4.859.48 6.318.926 10.783 1.678 14.549 6.16 10.844-14.34 7.48-24.564C245.17 7.06 243.195.096 237.733.35a383.151 383.151 0 0 0-3.172-.06c-2.805-.044-2.044-.07-4.858-.097-5.531-.052-11.054.018-16.577.114-1.328.017-2.665.07-3.993.07-3.329-.027-6.702.14-10.049.06-2.071-.034-4.535-.331-6.379.761-1.582.944-2.22 2.831-2.735 4.614-.857 2.918-1.713 6.03-2.447 9.219-.725 3.163-2.254 6.72-3.329 10.197-3.408 10.976-6.834 23.21-11.089 35.504-.018-4.544-.026-9.193-.044-13.946-.035-11.028-.07-22.632-.079-34.805 0-7.043-2.927-11.307-8.03-11.43-16.76-.104-29.107-.489-45.815-.463 0 16.935-.21 33.433-.131 50.272.157 33.537.515 67.285.515 99.547 8.232-.018 11.981-.14 20.221-.114 7.856.009 15.545-.009 23.025-.061 8.188.017 10.556-1.582 10.565-7.777 0-5.89.271-12.356-.026-18.866-.297-6.65-1.669-12.749-1.398-20.422.035-1.022.113-3.242 1.127-4.614.052-.078.114-.122.175-.192 0-.008.017-.017.026-.026 1.145-1.32 2.42-1.04 2.796-.175 5.112 11.884 7.253 25.018 12.164 39.795.148.463.306.935.463 1.433 1.949 6.047 7.541 10.162 13.885 10.267h.079c14.68-.411 25.489.079 40.179-.14 2.944-.026 5.898.158 8.851.14 1.914-.017 3.286-.725 3.784-1.861.289-.699.49-1.958-1.328-4.308-6.274-8.371-8.52-20.098-10.905-31.703l.008-.008ZM41.944 69.568c.096.21.2.42.296.63 7.626 16.155 15.288 32.38 20.412 49.506.401 1.345.828 2.761 1.805 3.765.976 1.005 2.71 1.442 3.79.542 1.212-.996.96-2.892.567-4.412-4.27-16.497-12.559-31.603-19.4-47.209-6.843-15.605-12.342-32.485-10.495-49.427.96-8.834 4.864-18.453 13.144-21.625C55.549 0 59.375-.008 63.106 0 80.72.036 98.326.08 115.94.115c.122 32.983.236 65.967.358 98.95.043 11.438.078 22.919-1.438 34.251-.759 5.645-2.336 11.901-7.2 14.854-3.163 1.922-7.068 2.01-10.772 2.045-25.415.227-50.83.454-76.245.672-6.32.053-13.736-.445-17.197-5.74-1.847-2.831-2.065-6.387-2.213-9.769A1133.686 1133.686 0 0 1 .204 95.012c-.052-6.64-.043-13.29.018-19.93.043-4.5-1.552-12.093 3.224-14.705 2.275-1.267 4.995-1.364 7.6-1.433 3.966-.105 7.923-.201 11.889-.306 4.366-.114 9.056-.14 12.69 2.298 3.007 2.01 4.759 5.356 6.328 8.641l-.01-.009Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
