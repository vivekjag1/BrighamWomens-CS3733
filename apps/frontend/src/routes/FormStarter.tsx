import React from "react";
import { Card, CardContent } from "@mui/material";
// import {TextField, Button} from '@mui/material';

export function FormStarter() {
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="text-center font-bold">Form Starter</h1>
          <div className="w-96 h-auto flex justify-center items-center">
            <form noValidate autoComplete="off" className="space-y-4">
              {/*<TextField*/}
              {/*    label="Name"*/}
              {/*    variant="outlined"*/}
              {/*    fullWidth*/}
              {/*    className="mb-4"*/}
              {/*    required*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label="Email"*/}
              {/*    type="email"*/}
              {/*    variant="outlined"*/}
              {/*    fullWidth*/}
              {/*    className="mb-4"*/}
              {/*    required*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label="Message"*/}
              {/*    variant="outlined"*/}
              {/*    fullWidth*/}
              {/*    multiline*/}
              {/*    rows={4}*/}
              {/*    className="mb-6"*/}
              {/*    required*/}
              {/*/>*/}
              {/*<Button variant="contained" color="primary" type="submit">*/}
              {/*    Send*/}
              {/*</Button>*/}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormStarter;
