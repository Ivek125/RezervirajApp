// API za dodavanje liječnika

const addDoctor = async (req, res) => {
  try {
    const { name, speciality, degree, experience, about, fees, address } = req.body;
    
    const imageFile = req.file;
    console.log({ name, speciality, degree, experience, about, fees, address }, imageFile);

  } catch (error) {

  }
}
export {addDoctor};