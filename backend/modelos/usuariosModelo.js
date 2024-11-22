import { db } from "./mysql.js";

// USUARIOS

// empleados

const agregarEmpleado = async (
  nombre,
  cargo,
  salario,
  fecha_contrato,
  username,
  password,
  rol
) => {
  const sql = `CALL AgregarEmpleado(?,?,?,?,?,?,?)`;
  const [result] = await db.execute(sql, [
    nombre,
    cargo,
    salario,
    fecha_contrato,
    username,
    password,
    rol,
  ]);
  return result;
};

const verEmpleadosActivos = async () => {
  const sql = `CALL verEmpleadosActivos()`;
  const [result] = await db.execute(sql);
  return result;
};

const verEmpleadoPorId = async (id) => {
  const sql = `CALL empleadoPorId(?)`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

const actualizarEmpleado = async (empleado_id, datosEmpleado) => {
  const { nombre, cargo, salario, fecha_contratacion } = datosEmpleado;
  const sql = `UPDATE empleados SET nombre = ?, cargo = ?, salario = ?, fecha_contratacion = ? WHERE id = ?`;
  const [result] = await db.execute(sql, [
    nombre,
    cargo,
    salario,
    fecha_contratacion,
    empleado_id,
  ]);
  return result;
};

const deshabilitarEmpleado = async (empleado_id) => {
  const sql = `CALL deshabilitarEmpleado(?)`;
  const [result] = await db.execute(sql, [empleado_id]);
  return result;
};

const habilitarEmpleado = async (empleado_id) => {
  const sql = `CALL habilitarEmpleado(?)`;
  const [result] = await db.execute(sql, [empleado_id]);
  return result;
};

const userModel = {
  agregarEmpleado,
  verEmpleadosActivos,
  verEmpleadoPorId,
  actualizarEmpleado,
  deshabilitarEmpleado,
  habilitarEmpleado,
};

export default userModel;