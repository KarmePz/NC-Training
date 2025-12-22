import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['instructor', 'alumno'], default: 'alumno' },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Solo para alumnos
});

export default mongoose.models.User || mongoose.model('User', UserSchema);