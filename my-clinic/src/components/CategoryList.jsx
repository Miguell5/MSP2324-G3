import React from 'react';
import { Typography, List, ListItem, ListItemText, IconButton, Tooltip, Divider } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const categories = [
  { name: 'General Health', symptoms: 'Fever, fatigue, general discomfort.' },
  { name: 'Respiratory Issues', symptoms: 'Coughing, shortness of breath, wheezing.' },
  { name: 'Cardiovascular Problems', symptoms: 'Chest pain, palpitations, shortness of breath.' },
  { name: 'Gastrointestinal Issues', symptoms: 'Nausea, vomiting, diarrhea, abdominal pain.' },
  { name: 'Musculoskeletal Issues', symptoms: 'Joint pain, muscle aches, stiffness.' },
  { name: 'Neurological Symptoms', symptoms: 'Headache, dizziness, numbness, tingling.' },
  { name: 'Skin Problems', symptoms: 'Rashes, itching, redness, swelling.' },
  { name: 'Allergies', symptoms: 'Sneezing, itching, runny nose, hives.' },
  { name: 'Mental Health', symptoms: 'Anxiety, depression, mood swings.' },
  { name: 'Pediatrics', symptoms: 'Common childhood illnesses, growth issues.' },
  { name: 'Gynecology', symptoms: 'Menstrual issues, pelvic pain, discharge.' },
  { name: 'Urology', symptoms: 'Urinary issues, pain during urination.' },
  { name: 'ENT (Ear, Nose, Throat)', symptoms: 'Earache, sore throat, sinus pain.' },
  { name: 'Endocrine Disorders', symptoms: 'Fatigue, weight changes, hormone issues.' },
  { name: 'Infectious Diseases', symptoms: 'Fever, chills, sweats, infection signs.' }
];

const CategoryList = ({ onSelectCategory }) => {
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Roboto Condensed, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.1rem',
        }}
      >
        Welcome to Remote Triage
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please select the category that fits your symptoms
      </Typography>
      <Divider sx={{ my: 2 }} />
      <List>
        {categories.map(category => (
          <ListItem
            button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            secondaryAction={
              <Tooltip title={category.symptoms}>
                <IconButton edge="end">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;
