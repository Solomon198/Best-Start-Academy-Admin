import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchData from '../../../components/app.search.data';

export default function DriverSearchBarMobile({
  drivers,
  doSearch,
  onSelected,
  isLoading,
}) {
  let timer;

  const search = (text: string) => {
    if (!text.trim()) return false;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      doSearch(text);
      clearTimeout(timer);
    }, 1000);
  };

  return (
    <Autocomplete
      className="sticky-top"
      id="combo-box-demo"
      loading={isLoading}
      options={drivers}
      renderOption={(option: any) => (
        <SearchData data={option} onClick={() => onSelected(option)} />
      )}
      getOptionLabel={(option: any) => option.firstName + ' ' + option.lastName}
      style={{
        width: '90%',
        marginRight: '5%',
        marginLeft: '5%',
        marginTop: 5,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for Drivers"
          onChange={(e) => search(e.target.value)}
          variant="outlined"
        />
      )}
    />
  );
}
