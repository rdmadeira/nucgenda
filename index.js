#!/usr/bin/env node
// El operador #! sirve para tornar el archivo ejecutable como node, porque si no va a tratar de correrlo como archivo Bash o un Shell. El comando which node nos da la ubicacion del binario de node.
import { Command } from 'commander';
import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';

import { contactsPrompts } from './prompts.js';
import { saveContacts, getContacts } from './utils.js';

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
      contacts[key] = { firstName, lastName, phoneNumber };
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
    ])
      .then(({ selected }) => {
        // selected es el name del prompt del objeto que se selecionó!!
        const contact = contacts[selected];
        console.log(`
        Info del Contacto:

            Nombre: ${contact.firstName}
            Apellido: ${contact.lastName}
            Tel/Cel: ${contact.phoneNumber}
      `);
      })
      .catch((error) =>
        console.log(error.code, 'error - selecione un contacto')
      );
  });

program.parse(process.argv); // necesita este parse para correr el programa.
