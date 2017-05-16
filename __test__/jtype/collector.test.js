// import {
//     JTypeCollector,
//     JTypes
// } from '../../src/jtype/collector';
//
// describe('JTypeCollector', () => {
//     test('number type and great than 5 and less than 15', () => {
//         expect(new JTypeCollector(JTypes.number).gt(5).and.lt(15).end.isMatch(10)).toBeTruthy();
//     });
//
//     test('number type and great than 5 or string type and not empty', () => {
//         epxect(new JTypeCollector(JTypes.number).gt(5).or.string.not.empty.end.isMatch(10)).toBeTruthy();
//     });
//
//     test('number type and great than 5 or string type and not empty', () => {
//         expect(new JTypeCollector(JTypes.number).gt(5).or.string.not.empty.end.isMatch('aaa')).toBeTruthy();
//     });
// });
