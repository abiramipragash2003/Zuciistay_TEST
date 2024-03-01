// Function to decode the JWT token and extract the username
function decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).sub;
}

// Function to fetch bookings for a specific user
async function fetchBookingsForUser(token) {
    const username = decodeToken(token);
    const apiUrl = `http://localhost:9090/booking/${username}`;
    
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        
        const bookings = await response.json();
        return bookings;
    } catch (error) {
        console.error(error);
    }
}

// Usage example
const token = localStorage.getItem('token'); // Retrieve token from localStorage
if (token) {
    fetchBookingsForUser(token)
        .then(bookings => {
            // Handle the fetched bookings data
            console.log('Bookings:', bookings);
            if(typeof bookings === "object")
            {
                bookings.forEach(element => {
                    const div=document.createElement("div");
                    div.className="card bg-gray-100 p-6 rounded-lg";
                    const  h2=document.createElement("h2");
                    h2.className="text-xl font-semibold mb-4";
                    const  h3=document.createElement("h3");
                    h3.className="text-xl font-semibold mb-4";
                    const para3=document.createElement("p");
                    para3.className="text-gray-600";
                    const para=document.createElement("p");
                    para.className="text-gray-600";
                    const input1=document.createElement("input");
                    input1.className="text-gray-600";
                    input1.readOnly=true;
                    const input2=document.createElement("input");
                    input2.className="text-gray-600";
                    input2.readOnly=true;
                    const input3=document.createElement("input");
                    input3.className="text-gray-600";
                    input3.readOnly=true;
                    const para1=document.createElement("p");
                    para1.className="text-gray-600";
                    const para2=document.createElement("p");
                    para2.className="text-gray-600";
                    const edit=document.createElement("button")
                    edit.className="editBtn";
                    edit.id=element.bookingId;
                    edit.innerText="Edit";

                    edit.addEventListener('click',()=>{
                        // console.log(edit.innerText)
                        // edit.innerText="submit"
                        if(edit.innerText=="Edit")
                        {
                            edit.innerText="submit"
                            input1.type="Date"
                            input1.readOnly=false
                            input2.type="Date"
                            input2.readOnly=false
                            input3.readOnly=false
                        }
                        else
                        {
                            edit.innerText="Edit"
                            input1.readOnly=true
                            input2.readOnly=true
                            input3.readOnly=true
                            updateform()
                        }


                    })
    
                    h2.innerText= element.place;
                    h3.innerText= "BookingId:"+ element.bookingId;
                    para3.innerText="Hotel Name:"+element.hotelName;
                    para.innerHTML="Check-in  :" 
                    input1.value=element.fromDate;
                    para1.innerHTML="Check-out :";
                    input2.value=element.toDate;
                    para2.innerText="Room Type :";
                    input3.value=element.roomType;
    
                    div.appendChild(h2);
                    div.appendChild(h3);
                    div.appendChild(para3);
                    div.appendChild(para);
                    div.appendChild(input1);
                    div.appendChild(para1);
                    div.appendChild(input2);
                    div.appendChild(para2);
                    div.appendChild(input3);
                    div.appendChild(edit);
    
                    const parentDiv=document.getElementById("show-booking");
                    parentDiv.appendChild(div);
                    
                    
                });
            }
            else{
                const para=document.createElement("p");
                para.innerHTML=bookings;
            }
            
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
        });
} else {
    console.error('Token not found in localStorage');
}
// async function updateform()
// {
    
        

//         const bookingData = {
//             username: username,
//             place: selectedPlace.place,
//             hotelName: selectedHotel.hotelName,
//             roomType: selectedRoomType.roomType,
//             fromDate: fromDateInput.value,
//             toDate: toDateInput.value
//         };

//         // Make a POST request to the /booking API to check availability
//         const checkApiUrl = 'http://localhost:9090/booking';
//         try {
//             const checkResponse = await fetch(checkApiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(bookingData)
//             });

//             if (!checkResponse.ok) {
//                 throw new Error('Failed to check availability');
//             }

//             const availabilityResult = await checkResponse.json();

//             if (availabilityResult) {
//                 // Room is available, proceed to store the booking
//                 const storeApiUrl = 'http://localhost:9090/bookingAdd';
//                 const storeResponse = await fetch(storeApiUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(bookingData)
//                 });

//                 if (!storeResponse.ok) {
//                     throw new Error('Failed to store booking');
//                 }

//                 const storeResult = await storeResponse.json();

//                 if (storeResult) 
//                 {
//                     // Booking successful
//                     //alert('Booking successful!');
//                     const newbooktab=document.getElementById("submitBtn")
//                     newbooktab.style.display="none"
//                     const div=document.createElement('div')
                    
//                     div.className="pop"
//                     const info=document.createElement('p')
//                     info.innerText=" Booked Successfully \n Your BookingId: "+storeResult.bookingId
//                     const layout=document.getElementsByClassName("flex justify-center")[1]
//                     console.log(layout)
//                     div.appendChild(info)

//                     layout.appendChild(div)
                    
                    

//                 } 
//                 else {
//                     // No room available
//                     alert('No room available');
//                 }
//             } else {
//                 // No room available
//                 alert('No room available');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     });
// });

// }

