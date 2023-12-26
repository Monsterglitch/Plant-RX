import React from 'react'
import '../styles/medicinal.css';

function MedicinalPlants() {
    const data = [
        {
            name: "Alovera",
            img: "https://media.istockphoto.com/id/1345935119/photo/aloe-or-aloe-vera-fresh-leaves-and-slices-on-white-background.jpg?s=612x612&w=0&k=20&c=eIDRIhnKA8MaNQ9YZz4y2klBwFCuigIoCMH7vwQjaKg="
        },
        {
            name: "Eucalyptus",
            img: "https://cdn-prod.medicalnewstoday.com/content/images/articles/266/266580/eucalyptus-leaves.jpg"
        },
        {
            name: "Thulasi",
            img: "https://media.istockphoto.com/id/1253676637/photo/holy-basil.jpg?s=612x612&w=0&k=20&c=4kZxa85rXwQ1yBZIgxKy8q3gHRrH796dTsZrVCUOoIs="
        },
        {
            name: "Mango",
            img: "https://www.greendna.in/cdn/shop/products/mango1_538x.jpg?v=1600280357"
        },
        {
            name: "Avaram",
            img: "https://m.media-amazon.com/images/I/51TgsFv4IVL._AC_UF1000,1000_QL80_.jpg"
        }
    ]
    return (
        <div className="medicinal-plants">
            <h1 className='med-title'>Medicinal Plants in Bharat</h1>
            <div className="plants">
                {
                    data.map((item) => {
                        return (
                            <div className="medicinal-card">
                                <img className='med-card-img' src={item.img} alt="" srcset="" />
                                <h4 className='med-card-name'>{item.name}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MedicinalPlants