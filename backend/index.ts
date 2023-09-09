import { SERVER_PORT } from "./config/enviroment_variables";

import validateList from "./utils/validateList";
import updateList from "./utils/updateList";

const express = require('express');
const cors = require('cors')

const server = express();

server.use(express.json({ limit: '50mb' }));
server.use(cors())
server.options('*', cors())

server.post('/api/validate', async (req: any, res: any) => {
  try {
    const object = await validateList(req.body.data)
    return res.json({
      success: true,
      object
    });
  } catch {
    return res.json({
      success: false,
      object: {},
      message: "Erro ao validar dados!"
    });
  }
})

server.put('/api/update', async (req: any, res: any) => {
  try {
    await updateList(req.body.data);

    return res.json({
      success: true,
      message: "Dados atualizados com sucesso!"
    });
  } catch {
    return res.json({
      success: false,
      object: {},
      message: "Erro ao atualizar dados!"
    });
  }
})

server.listen(SERVER_PORT);