import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Simsree Website',

  projectId: 'go86psxs',
  dataset: 'production',

  // Only allow e-mail + password sign-in. Google / GitHub buttons are hidden.
  // redirectOnSingle sends users straight to the login form, skipping the
  // "choose a provider" screen.
  auth: {
    redirectOnSingle: true,
    providers: [
      {
        name: 'sanity',
        title: 'E-mail / password',
        url: 'https://api.sanity.io/v1/auth/login/sanity',
      },
    ],
  },

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
