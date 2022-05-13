/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del()
    await knex('users').insert([
        { first_name: "Dominic", last_name: "Cullen", email: "dominiccullen@schweikartcokely.org", password: "pswrd", profile_pic_link: "https://image.shutterstock.com/image-photo/black-lawyer-portrait-260nw-252926029.jpg", is_lawyer: true, firm: "Schweikart & Cokely", bio: "" },
        { first_name: "Hazel", last_name: "Rodriguez", email: "hazelrodriguez@mesaverde.org", password: "pswrd", profile_pic_link: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Ffemale-advocate-in-lawyers-office-picture-id1195014435%3Fk%3D6%26m%3D1195014435%26s%3D170667a%26w%3D0%26h%3Dh9I_PA-h_ORA-VWi7opjIjqIORMG0kvW_wQCaambt1U%3D&f=1&nofb=1", is_lawyer: true, firm: "Mesa Verde", bio: "" },
        { first_name: "Eleanor", last_name: "Williams", email: "eleanorwilliams@mesaverde.org", password: "pswrd", profile_pic_link: "https://as1.ftcdn.net/jpg/01/06/92/56/500_F_106925653_HXwCA6gACm9WDVQ2jRWXxh6nC8T2hqup.jpg", is_lawyer: true, firm: "Mesa Verde", bio: "" },
        { first_name: "Alayna", last_name: "Melenia", email: "alaynamelenia@mesaverde.org", password: "pswrd", profile_pic_link: "https://media.istockphoto.com/photos/being-positive-boosts-her-work-ethic-picture-id482632465?k=6&m=482632465&s=612x612&w=0&h=KbzSCOYFooFSvymutAVvsp_vnpkG0KvKOwJjGf58b00=", is_lawyer: true, firm: "Mesa Verde", bio: "" },
        { first_name: "Matteo", last_name: "Flores", email: "matteoflores@schweikartcokely.org", password: "pswrd", profile_pic_link: "https://thumbs.dreamstime.com/b/lawyer-reading-book-law-library-university-48946892.jpg", is_lawyer: true, firm: "Schweikart & Cokely", bio: "" },
        { first_name: "Omar", last_name: "Hu", email: "omarhu@goodmanassociates.org", password: "pswrd", profile_pic_link: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.proheadshots.ca%2Fwp-content%2Fuploads%2F2016%2F02%2Flawyer-headshot-vancouver-1043B-1024x683.jpg&f=1&nofb=1", is_lawyer: true, firm: "Saul Goodman & Associates", bio: "" },
        { first_name: "Addison", last_name: "Keller", email: "addisonkeller@hhm.org", password: "pswrd", profile_pic_link: "https://media.istockphoto.com/photos/smiling-lawyer-in-office-picture-id104821157?k=6&m=104821157&s=170667a&w=0&h=RAsTLHPkhnsJWShISWH4-vjn6v_j9-iZpc_n_DQhPCA=", is_lawyer: true, firm: "Hamlin, Hamlin & McGill", bio: "" },
        { first_name: "Esther", last_name: "Roberts", email: "estherroberts@hhm.org", password: "pswrd", profile_pic_link: "https://media.gettyimages.com/photos/portrait-of-female-lawyer-in-business-suit-picture-id500068739", is_lawyer: true, firm: "Hamlin, Hamlin & McGill", bio: "" },
        { first_name: "Preston", last_name: "Allen", email: "prestonallen@mesaverde.org", password: "pswrd", profile_pic_link: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lexingtonlaw.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F05%2FLawyer.jpg&f=1&nofb=1", is_lawyer: true, firm: "Hamlin, Hamlin & McGill", bio: "" }
    ]);
};