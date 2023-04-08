import { useEffect, useRef, useState } from "react";
import { useLogin } from "@pankod/refine-core";
import { Container, Box, CircularProgress } from "@pankod/refine-mui";

import { yariga } from "assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const [isLoading,setIsLoading] = useState(true);

  console.log(`this the login loading is ${isLoading}`)

  const toggle = () => {
    setIsLoading((prev) => !prev)
  }

  const handleCallback = async (res: CredentialResponse) => {
    console.log('reaching')
    toggle()
    if (res.credential) {
      login(res);
    }
  };


  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }
      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCallback
          // async (res: CredentialResponse) => {
          //   setIsLoading(true)
          //   if (res.credential) {
          //     login(res);
          //   }
          //   setIsLoading(false)
          // },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
      finally{
        toggle()
      }
    });

    return <div ref={divRef} />;
  };

  return (
    <Box
      component="div"
      sx={{
        background: '#fff',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={yariga} alt="Refine Logo" />
          </div>
          <Box mt={4}>
            {!isLoading ? 
              <CircularProgress/>
             : 
              <GoogleButton />
            }
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
