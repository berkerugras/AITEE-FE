import React from "react";


const Aitee = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '2vh'
        }}
        >
            <div className="about-container">
                <h1>What is AiTee?</h1><br></br>
                <p>The aim of our project is to combine modern AI technologies, specifically GANs, and e-commerce technics to achieve unique products with AI-generated designs. 
                    The project will be accessible through a website and in the next stages mobile development will be considered. We will apply AI-generated designs on different products such as t-shirts, socks, etc., and what makes our project 
                    and our concept unique and interesting is that one design can only be bought by one user. This means each generated design will be displayed once to our clients.</p>
                <br></br><h1>Meet the team!</h1>
                <figure className="about-card">
                    <div className="profile-image"><img src="berker.jfif" alt="profile-sample2" /></div>
                    <figcaption>
                        <h3>Berker</h3>
                        <h5>Computer Engineering</h5>
                        <div className="icons"><a href="https://github.com/berkerugras/"><i className="ion-social-github"></i></a>
                            <a href="https://www.linkedin.com/in/berker-u%C4%9Fra%C5%9F-416ab7196/"><i className="ion-social-linkedin"></i></a>
                            <a href="https://www.instagram.com/berkerugras/"><i className="ion-social-instagram"></i></a>
                        </div>
                    </figcaption>
                </figure>

                <figure className="about-card">
                    <div className="profile-image"><img src='demet.jpg' alt="profile-sample2" /></div>
                    <figcaption>
                        <h3>DEMET</h3>
                        <h5>Software Engineering</h5>
                        <div className="icons"><a href="https://github.com/dmtss/"><i className="ion-social-github"></i></a>
                            <a href="https://www.linkedin.com/in/demet-kan-9918a4136/"><i className="ion-social-linkedin"></i></a>
                            <a href="https://www.instagram.com/d3meet/"><i className="ion-social-instagram"></i></a>
                        </div>
                    </figcaption>
                </figure>

                <figure className="about-card">
                    <div className="profile-image"><img src="ege.jfif" alt="profile-sample2" /></div>
                    <figcaption>
                        <h3>EGE</h3>
                        <h5>Software & Computer Engineering</h5>
                        <div className="icons"><a href="https://github.com/egesevinc/"><i className="ion-social-github"></i></a>
                            <a href="https://www.linkedin.com/in/egesevincc"><i className="ion-social-linkedin"></i></a>
                            <a href="https://www.instagram.com/egessevinc/"><i className="ion-social-instagram"></i></a>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>
    );
};

export default Aitee;