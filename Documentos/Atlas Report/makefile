all:
	{ \
	rm "atlas_report".pdf ;\
	latexmk -pdf -shell-escape main.tex ;\
	mv main.pdf "atlas_report".pdf ;\
	latexmk -CA ;\
	rm -R _minted-main ;\
	rm main.bbl ;\
	rm main.glo ;\
	rm main.ist ;\
	rm main.glg ;\
	rm main.gls ;\
	rm main.alg ;\
	rm main.acr ;\
	rm main.acn ;\
	evince "atlas_report".pdf ;\
	}
