#compdef clafoutis
# Zsh completion for clafoutis CLI
# Add to ~/.zshrc: source /path/to/clafoutis.zsh
# Or: eval "$(clafoutis completions zsh)"

_clafoutis() {
    local line state

    _arguments -C \
        '1: :->command' \
        '*: :->options'

    case $state in
        command)
            local commands=(
                'init:Initialize Clafoutis configuration'
                'generate:Generate platform outputs from design tokens'
                'sync:Sync design tokens from GitHub Release'
            )
            _describe -t commands 'clafoutis commands' commands
            ;;
        options)
            case $line[1] in
                init)
                    _arguments \
                        '--producer[Set up as a design token producer]' \
                        '--consumer[Set up as a design token consumer]' \
                        '-r[GitHub repo for consumer mode]:repo:' \
                        '--repo[GitHub repo for consumer mode]:repo:' \
                        '-t[Token directory path]:path:_files -/' \
                        '--tokens[Token directory path]:path:_files -/' \
                        '-o[Output directory path]:path:_files -/' \
                        '--output[Output directory path]:path:_files -/' \
                        '-g[Comma-separated generators]:generators:(tailwind figma)' \
                        '--generators[Comma-separated generators]:generators:(tailwind figma)' \
                        '--workflow[Create GitHub Actions workflow]' \
                        '--no-workflow[Skip GitHub Actions workflow]' \
                        '--files[File mappings for consumer]:mapping:' \
                        '--force[Overwrite existing configuration]' \
                        '--dry-run[Preview changes without writing files]' \
                        '--non-interactive[Skip prompts, use defaults or flags]' \
                        '--help[Show help]'
                    ;;
                generate)
                    _arguments \
                        '-c[Path to config file]:config:_files' \
                        '--config[Path to config file]:config:_files' \
                        '--tailwind[Generate Tailwind output]' \
                        '--figma[Generate Figma variables]' \
                        '-o[Output directory]:dir:_files -/' \
                        '--output[Output directory]:dir:_files -/' \
                        '--dry-run[Preview changes without writing files]' \
                        '--help[Show help]'
                    ;;
                sync)
                    _arguments \
                        '-f[Force sync even if versions match]' \
                        '--force[Force sync even if versions match]' \
                        '-c[Path to config file]:config:_files' \
                        '--config[Path to config file]:config:_files' \
                        '--dry-run[Preview changes without writing files]' \
                        '--help[Show help]'
                    ;;
            esac
            ;;
    esac
}

_clafoutis "$@"
