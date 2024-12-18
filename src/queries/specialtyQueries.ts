const specialtyQueries = {
    getSpecialties: "SELECT * FROM Specialty",
    getSpecialtyById: "SELECT * FROM Specialty WHERE specialty_id = $1",
    addSpecialty: "INSERT INTO Specialty (specialty_name) VALUES ($1) RETURNING *",
    updateSpecialty: "UPDATE Specialty SET specialty_name = $1 WHERE specialty_id = $2 RETURNING *",
    deleteSpecialty: "DELETE FROM Specialty WHERE specialty_id = $1",
    checkSpecialtyName: "SELECT * FROM Specialty WHERE specialty_name = $1"
};

export default specialtyQueries;