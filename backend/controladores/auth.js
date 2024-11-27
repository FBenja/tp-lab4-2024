import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../modelos/usuariosModelo.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username)
  const [usuario] = await userModel.usuarios(username);

// se le agrega !usuario como validación sino el codigo rompe (coment para el equipo)
  if (!usuario || usuario.length == 0) {
    return res.status(400).send({ mensaje: "usuario o contraseña invalidos" });
  }

  const passwordComparada = await bcrypt.compare(password, usuario.password);

  if (!passwordComparada) {
    return res.status(400).send({ mensaje: "usuario o contraseña invalidos" });
  }

  const payload = { username: usuario.username, rol: usuario.rol };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  res.status(200).send({
    mensaje: "login exitoso",
    Username: usuario.username,
    rol: usuario.rol,
    token,
  });
};

export default login;
