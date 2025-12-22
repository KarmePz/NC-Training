"use server" // Esto indica que el código corre solo en el servidor

import dbConnect from "@/lib/mongodb";
import Workout from "@/models/Workout";

export async function createWorkout(formData: any) {
  await dbConnect(); // Siempre conectar primero

  try {
    const newWorkout = await Workout.create({
      title: formData.title,
      instructorId: formData.instructorId,
      alumnoId: formData.alumnoId,
      exercises: formData.exercises, // Un array de objetos excercises
    });

    return { success: true, id: newWorkout._id.toString() };

  } catch (error) {
    console.error("Error creando entrenamiento:", error);
    return { success: false };
  }
}



export async function getAlumnoWorkouts(alumnoId: string) {
  await dbConnect();
  
  // Buscamos todos los entrenamientos asignados a este alumno
  const workouts = await Workout.find({ alumnoId: alumnoId }).sort({ createdAt: -1 });
  
  return workouts;
}

export async function updateWorkout(alumnoId: string, _id: string, formData: any){
    try{
    const result = await Workout.findOneAndUpdate({_id, alumnoId},{
        $set: 
        { 
            title: formData.title,
            instructorId: formData.instructorId,
            alumnoId: formData.alumnoId,
            exercises: formData.exercises,
        }

    }, {
        new: true,    // Devuelve el documento modificado
        runValidators: true // Valida que los datos sigan las reglas del Schema
        }); 

        if (!result) {
            return { success: false, message: "Rutina no encontrada" };
        }

        return { success: true, data: result };


    }catch (error){
        console.log("Error actualizando rutina de entrenamiento: ", error);
        return {success : false};
    }
}



export async function deleteWorkout(formData: any){
    try{
        await console.log("TODO");
    }catch (error){
        console.log("Error actualizando rutina de entrenamiento: ", error);
        return {success : false};
    }
}