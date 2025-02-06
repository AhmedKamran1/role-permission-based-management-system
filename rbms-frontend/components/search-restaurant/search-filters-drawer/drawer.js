import React, { useState } from 'react';

// Styles
import * as Styles from './drawer.styles';
import {
  Box,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  Radio,
  RadioGroup,
} from '@mui/material';
import { CustomCheckbox, InputField, Text } from '@/components/UI';

//Icons
import Search from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

// Utils
import { categoryTypes, SortBy } from '@/utils/constants';

const FilterDrawer = ({
  sortTypeHandler,
  categorySelectionHandler,
  categoryResetHandler,
  selectedCategories,
  selectedSortType,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [filterText, setFilterText] = useState('');

  const nonSelectedCategories = categoryTypes.filter(
    (category) => !selectedCategories.includes(category)
  );

  const filteredCategories = nonSelectedCategories.filter((category) =>
    category.toLowerCase().includes(filterText.toLowerCase())
  );

  const categoryChangeHandler = (category) => {
    categorySelectionHandler(category);
  };

  const sortChangeHandler = (sortType) => {
    sortTypeHandler(sortType);
  };

  const handleNavDrawer = () => {
    setShowDrawer((prevState) => !prevState);
  };
  return (
    <React.Fragment>
      <IconButton onClick={handleNavDrawer} sx={{ display: { xs: 'block', md: 'none' } }}>
        <MenuIcon color="primary" sx={{ fontSize: 25 }} />
      </IconButton>
      <Drawer
        sx={{ '& .MuiDrawer-paper': { width: '275px' } }}
        open={showDrawer}
        onClose={handleNavDrawer}
      >
        <List sx={{ mt: 3 }} disablePadding>
          <ListItem sx={{ pt: 0, pb: 0 }}>
            <Box>
              <Box pl={2}>
                <Text variant="subHeader" fontWeight={500} color="text.secondary">
                  Sort By
                </Text>
              </Box>
              <RadioGroup sx={{ mb: 2, mt: 2 }}>
                {Object.entries(SortBy).map(([key, value]) => (
                  <ListItemButton sx={{ pl: 2, pt: 0, pb: 0 }} key={key}>
                    <FormControlLabel
                      value={value.sortType}
                      color="text.secondary"
                      control={
                        <Radio
                          size="small"
                          checked={selectedSortType === value.sortType}
                          onChange={() => sortChangeHandler(value.sortType)}
                        />
                      }
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          color: 'text.secondary',
                        },
                      }}
                      label={value.text}
                    />
                  </ListItemButton>
                ))}
              </RadioGroup>
            </Box>
          </ListItem>
        </List>
        <List disablePadding>
          <ListItem sx={{ pt: 0, pb: 0 }}>
            <Box>
              <Box pl={2}>
                <Text variant="subHeader" fontWeight={500} color="text.secondary">
                  Categories
                </Text>
                {selectedCategories.length > 0 && (
                  <Styles.ResetText
                    variant="sub"
                    color="primary"
                    onClick={categoryResetHandler}
                  >
                    Reset
                  </Styles.ResetText>
                )}
              </Box>
              <InputField
                name="search"
                label="Search"
                variant="outlined"
                placeholder="Search Reviews"
                onChange={(event) => setFilterText(event.target.value)}
                value={filterText}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1, mt: 2 }}
              />
              <Box sx={{ maxHeight: '50vh', overflowY: 'auto', overflowX: 'hidden' }}>
                {selectedCategories.map((category, index) => (
                  <ListItemButton sx={{ pl: 2, pt: 0, pb: 0 }} key={category}>
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <CustomCheckbox
                            checked={selectedCategories.includes(category)}
                            value={category}
                            onChange={() => categoryChangeHandler(category)}
                          />
                        }
                        label={category}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            color: 'text.secondary',
                          },
                        }}
                      />
                    </FormGroup>
                  </ListItemButton>
                ))}
                {filteredCategories.map((category, index) => (
                  <ListItemButton sx={{ pl: 2, pt: 0, pb: 0 }} key={category}>
                    <FormGroup key={index}>
                      <FormControlLabel
                        control={
                          <CustomCheckbox
                            checked={selectedCategories.includes(category)}
                            value={category}
                            onChange={() => categoryChangeHandler(category)}
                          />
                        }
                        label={category}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            color: 'text.secondary',
                          },
                        }}
                      />
                    </FormGroup>
                  </ListItemButton>
                ))}
              </Box>
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default FilterDrawer;
