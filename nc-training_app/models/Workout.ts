import mongoose, { Schema, model, models } from 'mongoose';

// 1. Definir el esquema del ejercicio dentro del entrenamiento
const WorkoutExerciseSchema = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
  name: String,
  sets: Number,
  repsRange: String,
  notes: String,
});

// 2. Definir el esquema principal del Entrenamiento
const WorkoutSchema = new Schema({
  title: { type: String, required: true },
  instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  alumnoId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  exercises: [WorkoutExerciseSchema], // Array de ejercicios
}, { timestamps: true }); // Crea automáticamente 'createdAt' y 'updatedAt'

// 3. Exportar el modelo (Importante el check 'models.Workout' para Next.js)
const Workout = models.Workout || model('Workout', WorkoutSchema);
export default Workout;