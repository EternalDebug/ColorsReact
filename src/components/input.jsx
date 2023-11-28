import { ntc } from "../ntc";
import { React } from 'react'
import { Component } from 'react'

class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', r: '', g: '', b: '', okl: '', chrom: '', hue: '', name: '', error: '', h: '', s: '', l: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        
        let hex = this.state.value
        var n_match = ntc.name(hex);
        this.state.name = n_match[1];
        document.getElementsByTagName("BODY")[0].style.backgroundColor = hex;

        if (hex.length == 7) {
            this.state.r = this.Switcher(hex[1]) * 16 + this.Switcher(hex[2]);
            this.state.g = this.Switcher(hex[3]) * 16 + this.Switcher(hex[4]);
            this.state.b = this.Switcher(hex[5]) * 16 + this.Switcher(hex[6]);

            let hsl = this.RGBToHSL(this.state.r, this.state.g, this.state.b);
            this.state.h = hsl[0]
            this.state.s = hsl[1]
            this.state.l = hsl[2]
            
            let oklch = this.to_oklch(hsl[0], hsl[1] / 100, hsl[2] / 100);

            this.state.okl = oklch[0]
            this.state.chrom = oklch[1]
            this.state.hue = oklch[2]
            
            
        }
        else {
            
            this.state.error = 'Input must be like #FF1122'
        }
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    Switcher(symb) {
        let res = 0;
        switch (symb) {
            case 'A':
                res = 10;
                break;
            case 'B':
                res = 11;
                break;
            case 'C':
                res = 12;
                break;
            case 'D':
                res = 13;
                break;
            case 'E':
                res = 14;
                break;
            case 'F':
                res = 15;
                break;
            default:
                if (symb >= '0' && symb <= '9') {
                    res = Number(symb);
                }
                else {
                    
                }
        };
        return res;
    }

    RGBToHSL(r, g, b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return [h, s, l];
    }

    to_oklch(h, s, l) {
        // Convert HSL to Lab
        const h_rad = h * Math.PI / 180;
        const a = s * Math.cos(h_rad);
        const b = s * Math.sin(h_rad);
        l = l * 100; // Scale L to 0-100 range
        // Convert Lab to OKLCH
        const okl = l;
        const c = Math.sqrt(a * a + b * b);
        const h_okl = Math.atan2(b, a) * 180 / Math.PI;
        return [okl, c, h_okl];
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    HEX:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <h4>"RGB: "{this.state.r} {this.state.g} {this.state.b}</h4>
                <h4>"HSL: "{this.state.h} {this.state.s} {this.state.l}</h4>
                <h4>"Simplified oklch: "{this.state.okl} {this.state.chrom} {this.state.hue}</h4>
                <h4>"Color name: "{this.state.name}</h4>
            </form>


        );
    }
}


export { NameForm }
//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<NameForm />);
