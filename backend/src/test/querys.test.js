import { duplicateCheckQuery, idCheckQuery, dateModifyQuery, datesRemoveQuery, dateRemoveQuery, dateSaveQuery, dateGetQuery, datesGetQuery } from "#Database/dateQuerys.js"
import { correcto } from "./validationsMock.js"
describe('Dates Querys', () => {
    describe('DuplicateCheckQuery', () => {
        test('Allready exist a date', () => {
                duplicateCheckQuery(correcto.FechaDia)
                expect(duplicateCheckQuery(correcto.FechaDia))
                .toBe("SELECT FechaDia FROM Fechas WHERE FechaDia = '" + correcto.FechaDia + "';")
            })
        test('Error on the query', () => {
            try {
                duplicateCheckQuery(correcto.FechaDa)
            } catch (error) {
                expect(error.message)
                .toBe('The value of date is incorrect or is empty.')
            }
        })
        test('Query ok', () => {
            duplicateCheckQuery(correcto.FechaDia)
            expect(duplicateCheckQuery(correcto.FechaDia))
            .toBe("SELECT FechaDia FROM Fechas WHERE FechaDia = '" + correcto.FechaDia + "';")
        })
    })
    describe('IdCheckQuery', () => {
        test('Error on the query', () => {
            try {
                idCheckQuery(correcto.FechaDa)
            } catch (error) {
                expect(error.message)
                .toBe('The value of id is incorrect or is empty.')
            }
        })
        test('Data and query are ok', () => {
            expect(idCheckQuery(1140))
            .toBe("SELECT FechaID FROM Fechas WHERE FechaID = '1140';")
        })
    })
    describe('DateModifyQuery', () => {
        test('Data and query are ok', () => {
            dateModifyQuery(1, correcto.FechaDia, correcto.FechaDescripcion)
            expect(dateModifyQuery(30, correcto.FechaDia, correcto.FechaDescripcion))
            .toBe("UPDATE Fechas SET FechaDia = '2034-04-09', FechaDescripcion = 'Primera fecha de testing' WHERE fechaID = '30';")
        })
        test('Error on the query with the date', () => {
            try {
                dateModifyQuery(1, correcto.a, correcto.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('The value of date is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Error on the query with the description', () => {
            try {
                dateModifyQuery(1, correcto.FechaDia, correcto.FechaDecripcion)
            } catch (error) {
                expect(error.message)
                .toBe('The value of description is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Second error on the query with the description', () => {
            try {
                dateModifyQuery(1, correcto.FechaDia, 3)
            } catch (error) {
                expect(error.message)
                .toBe('description is not of text type.')
            }
        })
        test('Error on the query with the ID', () => {
            try {
                dateModifyQuery( "" , correcto.FechaDia, correcto.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('The value of id is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
    })
    describe('DatesRemoveQuery', () => {
        test('Query is OK', () => {
            let asd = datesRemoveQuery()
            expect(asd)
            .toBe("DELETE FROM Fechas;")
        })
    })
    describe('DateRemoveQuery', () => {
        test('Error on the query or Id', () => {
            try {
                dateRemoveQuery("")
            } catch (error) {
                expect(error.message)
                .toBe('The value of dateRemoveQuery is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Query este OK', () => {
            dateRemoveQuery(1140)
            expect(dateRemoveQuery(1140))
            .toBe("delete from Fechas where FechaID = '1140';")
        })
    })
    describe('DateSaveQuery', () => {
        test('Error on the query with the date', () => {
            try {
                dateSaveQuery(correcto.a, correcto.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('The value of dateSaveQuery is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Error on the query with the description', () => {
            try {
                dateSaveQuery(correcto.FechaDia, correcto.FechaDecripcion)
            } catch (error) {
                expect(error.message)
                .toBe('The value of dateSaveQuery is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Second error on the query with the description', () => {
            try {
                dateSaveQuery(correcto.FechaDia, 3)
            } catch (error) {
                expect(error.message)
                .toBe('description is not of text type.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Query is ok', () => {
            dateSaveQuery(correcto.FechaDia, correcto.FechaDescripcion)
            expect(dateSaveQuery(correcto.FechaDia, correcto.FechaDescripcion))
            .toBe("insert into Fechas ( FechaDia, FechaDescripcion) VALUES ('2034-04-09', 'Primera fecha de testing');")
        })
    })
    describe('DateGetQuery', () => {
        test('Error on the query with the ID', () => {
            try {
                dateGetQuery('')
            } catch (error) {
                expect(error.message)
                .toBe('The value of dateGetQuery is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Query is OK', () => {
            dateGetQuery(1)
            expect(dateGetQuery(1))
            .toBe("SELECT FechaID, FechaDescripcion,FechaDia FROM Fechas WHERE FechaID = '1'")
        })
    })
    describe('DatesGetQuery', () => {
        test('Query is OK', () => {
            expect(datesGetQuery())
            .toBe('SELECT FechaID,FechaDescripcion,FechaDia FROM  Fechas ORDER BY FechaDia ASC')
        })
    })
})