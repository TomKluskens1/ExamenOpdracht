import { Context } from 'koa';
import { prisma } from '../data';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY as string;
// Login user
export const loginUser = async (ctx: Context) => {
  const { email, password } = ctx.request.body as { email: string; password: string };

  try {
    if (!email || !password) {
      ctx.status = 400;
      ctx.body = { message: 'Email en wachtwoord zijn verplicht' };
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'Gebruiker bestaat niet' };
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      ctx.status = 401;
      ctx.body = { message: 'Onjuist wachtwoord' };
      return;
    }

    // Genereer een JWT-token
    const token = jwt.sign({ userId: user.user_id, username: user.username, email: user.email }, secretKey, {
      expiresIn: '1h',
    });

    ctx.status = 200;
    ctx.body = {
      message: 'Ingelogd',
      token, // Stuur het token naar de frontend
      user: { id: user.user_id, username: user.username, email: user.email,  bio: user.bio || 'Er is nog geen bio' },
    };
  } catch (error) {
    console.error('Login fout:', error);
    ctx.status = 500;
    ctx.body = { message: 'Er ging iets mis met het inloggen' };
  }
};

// Register user
export const registerUser = async (ctx: Context) => {
  const { username, email, password } = ctx.request.body as { username: string; email: string; password: string };

  try {
    // Validatie controleren
    if (!username || !email || !password) {
      ctx.status = 400;
      ctx.body = { message: 'Gebruikersnaam, email en wachtwoord zijn verplicht' };
      return;
    }

    // Controleer of de gebruiker al bestaat
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: 'Gebruiker bestaat al' };
      return;
    }

    // Versleutel het wachtwoord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Maak een nieuwe gebruiker aan
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    ctx.status = 201;
    ctx.body = {
      message: 'Gebruiker aangemaakt',
      user: { id: newUser.user_id, username: newUser.username, email: newUser.email },
    };
  } catch (error) {
    console.error('Registratiefout:', error);
    ctx.status = 500;
    ctx.body = { message: 'Registratie mislukt' };
  }
};
// Update de bio van de gebruiker
export const updateUserBio = async (ctx: Context) => {
  const { user_id, bio } = ctx.request.body as { user_id: string; bio: string };

  try {
    // Controleer of gebruikersinformatie geldig is
    if (!user_id || !bio) {
      ctx.status = 400;
      ctx.body = { message: 'Gebruikers-ID en bio zijn verplicht' };
      return;
    }

    // Converteer user_id naar een integer
    const userIdInt = parseInt(user_id, 10);

    if (isNaN(userIdInt)) {
      ctx.status = 400;
      ctx.body = { message: 'Ongeldig gebruikers-ID' };
      return;
    }

    // Update de bio van de gebruiker in de database
    const updatedUser = await prisma.user.update({
      where: {
        user_id: userIdInt, // Gebruik de geconverteerde integer waarde
      },
      data: {
        bio,
      },
    });

    ctx.status = 200;
    ctx.body = {
      message: 'Bio succesvol bijgewerkt!',
      user: { id: updatedUser.user_id, username: updatedUser.username, bio: updatedUser.bio },
    };
  } catch (error) {
    console.error('Fout bij het bijwerken van de bio:', error);
    ctx.status = 500;
    ctx.body = { message: 'Er is iets misgegaan, probeer het later opnieuw.' };
  }
};
export const getUserRecipes = async (ctx: Context) => {
  const userId = parseInt(ctx.params.userId, 10);

  if (isNaN(userId)) {
    ctx.status = 400;
    ctx.body = { message: 'Ongeldig gebruikers-ID' };
    return;
  }

  try {
    const recipes = await prisma.recipe.findMany({
      where: { user_id: userId },
    });

    ctx.status = 200;
    ctx.body = { recipes };
  } catch (error) {
    console.error('Fout bij ophalen recepten:', error);
    ctx.status = 500;
    ctx.body = { message: 'Fout bij ophalen recepten' };
  }
};