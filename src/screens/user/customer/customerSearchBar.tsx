import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchData from "../../../components/app.search.data";

export default function CustomerSearchBar({
  customers,
  doSearch,
  onSelected,
  isLoading,
}) {
  let timer;

  const search = (text) => {
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
      options={customers}
      loading={isLoading}
      renderOption={(option: any) => (
        <SearchData data={option} onClick={() => onSelected(option)} />
      )}
      getOptionLabel={(option: any) => option.firtName + " " + option.lastName}
      style={{
        width: "90%",
        marginRight: "5%",
        marginLeft: "5%",
        marginTop: 5,
        // position: 'fixed',
        // zIndex: 1,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => search(e.target.value)}
          label="Search for Teachers"
          variant="outlined"
        />
      )}
    />
  );
}
