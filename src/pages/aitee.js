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
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet, erat eget efficitur tincidunt,
                    eros diam sodales lorem, at ornare urna elit vel diam. Nunc quis urna auctor, vulputate mi at, mollis mi.
                    Mauris et convallis massa, quis porttitor augue. Morbi egestas eleifend feugiat. In hac habitasse platea dictumst.
                    Etiam rutrum posuere neque eu imperdiet. Vestibulum quis ligula magna. Ut ut nisl consectetur, tincidunt purus et,
                    hendrerit elit. Nulla a consectetur elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porttitor
                    condimentum magna, a cursus ante efficitur vitae.

                    Aliquam id risus et nunc ullamcorper tempor. Nam commodo mollis porta. Donec luctus dolor et dui facilisis interdum.
                    Ut vulputate tortor ut pretium efficitur. Nulla sit amet dolor ultricies, finibus libero et, lobortis elit. Sed commodo
                    vel dui vel pretium. Vestibulum consectetur, neque at condimentum semper, urna purus tempor nisl, sed faucibus dolor risus
                    in diam. In auctor placerat purus pulvinar commodo. Cras aliquam nunc eu tortor ultricies commodo. Quisque eu ligula tellus.</p>
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