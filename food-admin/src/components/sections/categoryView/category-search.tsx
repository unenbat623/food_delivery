import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import Iconify from "@/components/iconify";
// ----------------------------------------------------------------------
export default function PostSearch({ categories, onSearch }: any) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: "body2",
            },
          },
        },
      }}
      options={categories}
      getOptionLabel={(post: any) => post.name}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      onInputChange={(event, newInputValue) => {
        onSearch(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Хайх"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
