const specialtyQueries = {
    getSpecialties: "SELECT * FROM Specialty",
    getSpecialtyById: "SELECT * FROM Specialty WHERE specialty_id = $1",
    addSpecialty: "INSERT INTO Specialty (specialty_name, available_days, estimated_time) VALUES ($1, $2, $3) RETURNING *",
    updateSpecialty: "UPDATE Specialty SET specialty_name = $1, available_days = $2, estimated_time = $3 WHERE specialty_id = $4 RETURNING *",
    deleteSpecialty: "DELETE FROM Specialty WHERE specialty_id = $1",
    checkSpecialtyName: "SELECT * FROM Specialty WHERE specialty_name = $1"
};

export default specialtyQueries;