import { generateUsers, generateUser } from '../src/utils/userMocking.js';
import { generatePets, generatePet } from '../src/utils/petMocking.js';

// Función de prueba simple
async function testMockingModules() {
    console.log('=== TESTING MOCKING MODULES ===\n');
    
    // Test generación de usuario individual
    console.log('1. Generando un usuario individual...');
    try {
        const user = await generateUser();
        console.log('✅ Usuario generado:');
        console.log(`   - Nombre: ${user.first_name} ${user.last_name}`);
        console.log(`   - Email: ${user.email}`);
        console.log(`   - Role: ${user.role}`);
        console.log(`   - Password encriptada: ${user.password.substring(0, 20)}...`);
        console.log(`   - Pets: [${user.pets.length}]`);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
    
    console.log('\n2. Generando múltiples usuarios...');
    try {
        const users = await generateUsers(3);
        console.log(`✅ ${users.length} usuarios generados exitosamente`);
        users.forEach((user, index) => {
            console.log(`   Usuario ${index + 1}: ${user.first_name} ${user.last_name} (${user.role})`);
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
    
    console.log('\n3. Generando mascotas...');
    try {
        const pets = generatePets(3);
        console.log(`✅ ${pets.length} mascotas generadas exitosamente`);
        pets.forEach((pet, index) => {
            console.log(`   Mascota ${index + 1}: ${pet.name} (${pet.specie}) - Adoptada: ${pet.adopted}`);
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
    
    console.log('\n=== TESTS COMPLETADOS ===');
}

testMockingModules();