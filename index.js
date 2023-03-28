import { Command } from 'commander';
import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';

import { contactsPrompts } from './prompts';
import { saveContacts, getContacts } from './utils';

const program = new Command();
const { prompt } = inquirer;

program
  .name('NUCGENDA')
  .version('1.0.0')
  .description(chalk.cyan(figlet.textSync('NUC GENDA')));

program
  .command('new')
  .alias('n')
  .description(chalk.green('Agregar nuevo contacto'))
  .action(() => {
    prompt(contactsPrompts).then(({ firstName, lastName, phoneNumber }) => {
      const key = firstName + ' ' + lastName;
      let contacts = getContacts();
      contact[key] = { firstName, lastName, phoneNumber };
      saveContacts(contacts);
      console.log(chalk.bgGreen('Usuario creado correctamente!!'));
    });
  });

program
  .command('list')
  .alias('l')
  .description(chalk.green('Listar contactos'))
  .action(() => {
    let contacts = getContacts();
    prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: 'Seleccionar contacto:',
        choices: Object.keys(contacts),
      },
    ]).then(({ selected }) => {
      // selected es el name del prompt del objeto que se selecionó!!
      const contact = contacts[selected];
      console.log(`
        Info del Contacto:

            Nombre: ${contact.firstName}
            Apellido: ${contact.lastName}
            Tel/Cel: ${contact.phoneNumber}
      `);
    });
  });

program.parse(process.argv); // necesita este parse para correr el programa.
