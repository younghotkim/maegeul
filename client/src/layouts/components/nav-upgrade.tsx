import type { StackProps } from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { textGradient } from "../../theme/styles";

// ----------------------------------------------------------------------

export function NavUpgrade({ sx, ...other }: StackProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ mb: 4, textAlign: "center", ...sx }}
      {...other}
    >
      <Typography
        variant="h6"
        sx={(theme) => ({
          ...textGradient(
            `to right, ${theme.vars.palette.secondary.main}, ${theme.vars.palette.warning.main}`
          ),
        })}
      >
        매일 글쓰기 플랫폼: maegeul
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
        {`Created By `}
        <Box component="strong" sx={{ color: "text.primary" }}>
          릿미
        </Box>
      </Typography>

      <Box component="img" src="" sx={{ width: 200, my: 2 }} />

      <Button
        href="https:/github.com/younghotkim/maegeul/"
        target="_blank"
        variant="contained"
        color="inherit"
      >
        Github로 바로가기
      </Button>
    </Box>
  );
}
