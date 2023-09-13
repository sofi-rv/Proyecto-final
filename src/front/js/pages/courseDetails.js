import React from "react";
import "../../styles/courseDetails.css";

export const CourseDetails = () => {
    return (
        <div className="courseDetails_page">
            <div className="courseDetails_content">
                <h3>Nombre del curso</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo mauris eu dolor ullamcorper, ac lobortis ante rhoncus. Mauris ut odio vitae libero tempor aliquam. Aliquam venenatis varius sem eu cursus. Quisque pretium ipsum nec turpis tristique, vel ullamcorper nulla venenatis. Maecenas sollicitudin elit magna, quis accumsan dolor laoreet id. Maecenas sed tortor viverra, sollicitudin ipsum vitae, rhoncus erat. Cras in dignissim nunc. Duis malesuada urna quis lorem ultricies pulvinar quis sit amet lacus. Aliquam lacus enim, ultricies non pharetra non, varius eu mi. Suspendisse scelerisque leo id lorem elementum pellentesque nec nec neque. In semper augue a nisl hendrerit vulputate. Curabitur neque eros, egestas eu mattis nec, euismod sit amet tortor.

                    Pellentesque ac ultrices lectus. Integer ut suscipit nibh. Nullam condimentum tristique erat, vel aliquet ipsum hendrerit non. Vivamus at volutpat ligula, sit amet gravida nisi. Etiam ac elit vitae elit tincidunt lobortis. Phasellus posuere a enim lacinia varius. Donec et ante ante. Donec hendrerit dictum consectetur. Vestibulum ornare at quam non fermentum.</p>
                <div className="d-flex align-items-start">
                    <div className="me-5">
                        <h4>Contenidos:</h4>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        </ul>
                    </div>
                    <div className="ms-5">
                        <p className="mb-1">Costo: $100</p>
                        <p className="mb-1">Modalidad: Virtual/Presencial/Híbrido</p>
                        <p className="mb-1">Fecha de inicio: dd/mm/yyyy</p>
                        <p className="mb-1">Duración: X meses</p>
                        <p>Código: xxxxxx</p>
                    </div>
                </div>
                <button className="courseDetails_button mt-5">Matricular</button>
            </div>
        </div>
    )
};
