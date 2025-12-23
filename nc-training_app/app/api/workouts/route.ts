import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Workout from "@/models/Workout";

// Método POST: Crear un nuevo entrenamiento
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validación básica
    if (!body.title || !body.alumnoId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const newWorkout = await Workout.create(body);
    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Método GET: Listar entrenamientos (puedes filtrar por alumnoId en el query)
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const alumnoId = searchParams.get("alumnoId");

    const query = alumnoId ? { alumnoId } : {};
    const workouts = await Workout.find(query).sort({ createdAt: -1 });

    return NextResponse.json(workouts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}