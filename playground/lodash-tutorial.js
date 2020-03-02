const _ = require('lodash')
//._get
const person_1 = {
    name: "Nguyen van a",
    job: {
        title: "student",
        univer: {
            name: "DH BK",
            major: "CNTT"
        }
    }

}
const person_2 = {
    name: "Phuc ",
    job: {
        title: "Business man",
        office:
            [
                {
                    name: "DH BK",
                    address: "VP QUan 10"
                },
                {
                    name: "DH b",
                    address: "VP QUan 3"
                },
                {
                    name: "DH K",
                    address: "VP QUan 2"
                },
            ]
    }

}
const person = [person_1, person_2]
person.forEach(p => {
    // const print = p.job && p.job.univer && p.job.univer.major
    // console.log(print)
    console.log(_.get(p, "job.univer.major", "Khong co major"))
})
//2. _.set
_.set(person_2, "job.university.major", "AI")
console.log(person_2)