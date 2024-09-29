import type { BoxProps } from "@mui/material/Box";
import type { CardProps } from "@mui/material/Card";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import ListItemText from "@mui/material/ListItemText";

import { fToNow } from "../../utils/format-time";

import { Iconify } from "../../dashboardComponents/iconify";
import { Scrollbar } from "../../dashboardComponents/scrollbar";

import type { PostItemProps } from "../blog/post-item";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: PostItemProps[];
};

export function AnalyticsNews({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 200 }}>
        <Box sx={{ minWidth: 640 }}>
          {list.map((post) => (
            <PostItem key={post.id} item={post} />
          ))}
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Link to="/contents">
          <Button
            size="small"
            color="inherit"
            endIcon={
              <Iconify
                icon="eva:arrow-ios-forward-fill"
                width={18}
                sx={{ ml: -0.5 }}
              />
            }
          >
            모두 보기
          </Button>
        </Link>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function PostItem({
  sx,
  item,
  ...other
}: BoxProps & { item: Props["list"][number] }) {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        gap: 2,
        display: "flex",
        alignItems: "center",
        borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <ListItemText
        primary={item.title}
        secondary={item.description}
        primaryTypographyProps={{ noWrap: true, typography: "subtitle2" }}
        secondaryTypographyProps={{ mt: 0.5, noWrap: true, component: "span" }}
      />

      <Box
        sx={{ flexShrink: 0, color: "text.disabled", typography: "caption" }}
      >
        {fToNow(item.postedAt)}
      </Box>
    </Box>
  );
}
