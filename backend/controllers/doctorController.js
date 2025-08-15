import doctorModel from "../models/doctorModel.js"


const changeAvailability = async (req, res) => {
  const { id } = req.params
  const { available } = req.body

  try {
    const {docID} = req.body
    const docData = await doctorModel.findById(docID)
    await doctorModel.findByIdAndUpdate(docID, { available: !docData.available })
    res.json({ success: true, message: 'Dostupnost doktora promijenjena' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email']);
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { changeAvailability, doctorList }