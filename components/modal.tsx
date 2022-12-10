interface ModalProps {
  title: string;
  initialize: any;
  setInitialize: any;
  description?: string;
  children: any;
}

export default function Modal({
  title,
  initialize,
  setInitialize,
  description,
  children,
}: ModalProps){
  return (
    initialize && (
      <>
        <div className="modal_container">
          <div className="message_container">
            <section>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
              <button
                type="button"
                className="btnClose"
                onClick={() => {
                  setInitialize(!initialize);
                }}
              >
                X
              </button>
            </section>
            {children}
          </div>
        </div>
        <style jsx>
          {`
            section {
              position: relative;
              padding: 1rem;
              border-bottom: 1px solid gray;
            }
            section h3 {
              margin: 0px;
              font-size: 1.2rem;
            }
            section p {
              margin: 0px;
              font-size: 0.8rem;
            }
            .modal_container {
              position: absolute;
              right: 0px;
              bottom: 0px;
              left: 0px;
              top: 0px;
              height: 100vh;
              width: 100vw;
              z-index: 900;
              background-color: rgba(0, 0, 0, 0.25);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .message_container {
              background-color: white;
              min-width: 20rem;
              min-height: 20rem;
              border-radius: 0.5rem;
            }
            .btnClose {
              position: absolute;
              right: 0px;
              top: 0px;
              padding: 0.5rem;
              text-align: center;
              cursor: pointer;
              border: none;
              background: none;
              color: black;
              font-weight: 550;
              border-radius: 0 0.5rem 0 0;
            }

            .btnClose:hover {
              background-color: red;
              color: white;
            }
          `}
        </style>
      </>
    )
  );
}
