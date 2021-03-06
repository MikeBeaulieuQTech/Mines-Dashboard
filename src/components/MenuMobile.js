import React from "react";
import { StaticQuery, Link, graphql } from "gatsby";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import { DotsVertical } from "mdi-material-ui";

class MenuMobile extends React.Component {
  state = {
    anchorEl: null,
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state,
      { menuLinks } = this.props.data.site.siteMetadata;
    return (
      <>
        <IconButton onClick={this.handleOpen}>
          <DotsVertical style={{ color: "#efefef" }} />
        </IconButton>
        <ClickAwayListener onClickAway={this.handleClose}>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {menuLinks.map(link => (
              <Link key={link.name} to={link.link}>
                <MenuItem>{link.name}</MenuItem>
              </Link>
            ))}
            
          </Menu>
        </ClickAwayListener>
      </>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query MenuMobileQuery {
        site {
          siteMetadata {
            menuLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => <MenuMobile active={props.active} data={data} />}
  />
);
