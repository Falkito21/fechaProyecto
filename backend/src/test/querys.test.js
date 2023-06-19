import { duplicateCheckQuery, idCheckQuery, dateModifyQuery, datesRemoveQuery, dateRemoveQuery, dateSaveQuery, dateGetQuery, datesGetQuery } from "#Database/dateQuerys.js"
import { correcto } from "./validationsMock.js"
describe('Dates Querys', () => {
    describe('DuplicateCheckQuery', () => {
        test('Allready exist a date', () => {
                duplicateCheckQuery(correcto.date)
                expect(duplicateCheckQuery(correcto.date))
                .toBe("SELECT date FROM DATES WHERE date = '" + correcto.date + "';")
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
            duplicateCheckQuery(correcto.date)
            expect(duplicateCheckQuery(correcto.date))
            .toBe("SELECT date FROM DATES WHERE date = '" + correcto.date + "';")
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
            .toBe("SELECT id FROM DATES WHERE id = '1140';")
        })
    })
    describe('DateModifyQuery', () => {
        test('Data and query are ok', () => {
            dateModifyQuery(1, correcto.date, correcto.description)
            expect(dateModifyQuery(30, correcto.date, correcto.description))
            .toBe("UPDATE DATES SET date = '2034-04-09', description = 'Primera fecha de testing' WHERE id = '30';")
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
                dateModifyQuery(1, correcto.date, correcto.description)
            } catch (error) {
                expect(error.message)
                .toBe('The value of description is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Second error on the query with the description', () => {
            try {
                dateModifyQuery(1, correcto.date, 3)
            } catch (error) {
                expect(error.message)
                .toBe('The description is not of text type.')
            }
        })
        test('Error on the query with the ID', () => {
            try {
                dateModifyQuery( "" , correcto.date, correcto.description)
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
            .toBe("DELETE FROM DATES;")
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
            .toBe("delete from DATES where id = '1140';")
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
                dateSaveQuery(correcto.date, correcto.description)
            } catch (error) {
                expect(error.message)
                .toBe('The value of dateSaveQuery is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Second error on the query with the description', () => {
            try {
                dateSaveQuery(correcto.date, 3)
            } catch (error) {
                expect(error.message)
                .toBe('The description is not of text type.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Query is ok', () => {
            dateSaveQuery(correcto.date, correcto.description)
            expect(dateSaveQuery(correcto.date, correcto.description))
            .toBe("insert into DATES ( date, description) VALUES ('2034-04-09', 'Primera fecha de testing');")
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
            .toBe("SELECT id, description,date FROM DATES WHERE id = '1'")
        })
    })
    describe('DatesGetQuery', () => {
        test('Query is OK', () => {
            expect(datesGetQuery())
            .toBe('SELECT id,description,date FROM  DATES ORDER BY date ASC')
        })
    })
})