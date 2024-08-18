// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import '../DisplayScrapes.css'; 

// export default function DisplayScrapes() {
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('/api/scraper/data');
//                 setData(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) return <p>Loading data...</p>;
//     if (error) return <p>Error loading data: {error}</p>;
//     return (
//         <div className="container">
//             <h1>Scraped Data Organized by Category</h1>
//             {Object.keys(data).map(category => (
//                 <div key={category} className="category">
//                     <h2>{category}</h2>
//                     <ul>
//                         {data[category].map(item => (
//                             <li key={item._id} className="item">
//                                 <h3>{item.title}</h3>
//                                 <p>URL: <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></p>
//                                 <h4>Headings:</h4>
//                                 <ul>
//                                     {item.headings.map((heading, index) => (
//                                         <li key={index}>{heading}</li>
//                                     ))}
//                                 </ul>
//                                 <h4>Links:</h4>
//                                 <ul>
//                                     {item.links.map((link, index) => (
//                                         <li key={index}>
//                                             <a href={link.href} target="_blank" rel="noopener noreferrer">
//                                                 {link.text || link.href}
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <h4>Paragraphs:</h4>
//                                 <p>{item.paragraphs.join(' ')}</p>
//                                 <h4>Images:</h4>
//                                 <ul className="image-list">
//                                     {item.images.map((image, index) => (
//                                         <li key={index}>
//                                             <img src={image.src} alt={image.alt} className="image" />
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../DisplayScrapes.css'; 

export default function DisplayScrapes() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/scraper/data');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // State to manage which items are expanded
    const [expandedItems, setExpandedItems] = useState({});

    const toggleReadMore = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error loading data: {error}</p>;

    return (
        <div className="container">
            <h1>Saved Web Scraped Data</h1>
            {Object.keys(data).map(category => (
                <div key={category} className="category">
                    <h2>{category}</h2>
                    <ul>
                        {data[category].map(item => (
                            <li key={item._id} className="item">
                                <h3>{item.title}</h3>
                                <p>URL: <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></p>
                                <h4>Headings:</h4>
                                <ul>
                                    {item.headings.map((heading, index) => (
                                        <li key={index}>{heading}</li>
                                    ))}
                                </ul>
                                <h4>Links:</h4>
                                <ul>
                                    {item.links.map((link, index) => (
                                        <li key={index}>
                                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                                                {link.text || link.href}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <h4>Paragraphs:</h4>
                                <p>
                                    {expandedItems[item._id] ? item.paragraphs.join(' ') : `${item.paragraphs.slice(0, 2).join(' ')}...`}
                                </p>
                                <button onClick={() => toggleReadMore(item._id)}>
                                    {expandedItems[item._id] ? 'Read Less' : 'Read More'}
                                </button>
                                <h4>Images:</h4>
                                <ul className="image-list">
                                    {item.images.map((image, index) => (
                                        <li key={index}>
                                            <img src={image.src} alt={image.alt} className="image" />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
