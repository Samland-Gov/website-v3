import markdownit from 'markdown-it'
import markdownitGovuk from 'markdown-it-govuk'
import highlight from 'markdown-it-govuk/highlight'

const md = markdownit({
    highlight
})

md.use(markdownitGovuk)

export function renderMarkdown(rawContent: string): string {
    return md.render(rawContent);
}